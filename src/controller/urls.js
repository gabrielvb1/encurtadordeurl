import { db } from "../connection/connection.js";
import crypto from 'crypto';

class UrlsController {
  async getUserUrls(req, res) {
    try {
      const userId = req.id;

      if (!userId) {
        return res.status(401).json({ error: 'Acesso negado. Usuário não autenticado.' });
      }

      const userUrls = await db('urls').select('*').whereNull('deleted_at').andWhere({ userId });

      return res.status(200).json({ urls: userUrls });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar URLs do usuário.' });
    }
  }

  async createShortUrl(req, res) {
    try {
      const { bigUrl } = req.body;

      if (!bigUrl || typeof bigUrl !== 'string') {
        return res.status(400).json({ error: 'URL inválida ou ausente.' });
      }

      const shortId = crypto.randomBytes(3).toString('hex');

      const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

      const userId = req.id || null;

      await db('urls').insert({ bigUrl, shortId, userId, shortenedUrl });

      return res.status(201).json({ originalUrl: bigUrl, shortenedUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }

  async updateOriginalUrl(req, res) {
    const { newBigUrl, shortenedUrl } = req.body;
    const userId = req.id;
    if (!newBigUrl) {
      return res.status(400).json({ error: 'O campo newBigUrl é obrigatório.' });
    }
  
    try {
      const urlRecord = await db('urls').select('*').whereNull('deleted_at').andWhere({ shortenedUrl }).andWhere({ userId }).first();
  
      if (!urlRecord) {
        return res.status(404).json({ error: 'URL não encontrada.' });
      }
  
      if (urlRecord.userId !== req.id) {
        return res.status(403).json({ error: 'Você não tem permissão para editar esta URL.' });
      }

      const updatedUrl = await db('urls')
        .where({ shortenedUrl })
        .update({ bigUrl: newBigUrl, updated_at: new Date().toISOString() }).returning('*');
  
      return res.status(200).json({
         updatedUrl
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async deleteUrl(req, res) {    
    const { shortId } = req.params;
    const userId = req.id;
    const urlRecord = await db('urls').select('*').where({ shortId }).andWhere({ userId }).first();

    try {
      if (!urlRecord) {
        return res.status(404).json({ error: 'URL não encontrada.' });
      }
  
      if (urlRecord.deleted_at) {
        return res.status(400).json({ error: 'URL já foi excluída.' });
      }
  
      if (urlRecord.userId !== req.id) {
        return res.status(403).json({ error: 'Você não tem permissão para excluir esta URL.' });
      }
  
      await db('urls')
        .where({ shortId })
        .update({ deleted_at: new Date().toISOString() });
  
      return res.status(200).json({ ok: 'URL excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  
  
  
  async redirectToOriginalUrl(req, res) {
    const { shortenedUrl } = req.body;
    const userId = req.id;
    try {
      const urlRecord = await db('urls').select('*').whereNull('deleted_at').andWhere({ shortenedUrl }).andWhere({ userId }).first();
  
      if (!urlRecord) {
        return res.status(404).json({ error: 'URL não encontrada.' });
      }

      await db('urls')
        .where({ shortenedUrl })
        .update({
          usageCount: urlRecord.usageCount + 1
        });
  
      return res.redirect(302, urlRecord.bigUrl);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  
}

export default new UrlsController();
