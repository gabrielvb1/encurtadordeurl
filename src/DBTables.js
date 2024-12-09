import { db } from "./connection/connection.js";

export const createUrlTable = async () => {
    try {
      const exists = await db.schema.hasTable('urls');

      if (!exists) {
        await db.schema.createTable('urls', table => {
          table.increments('id').primary();
          table.text('bigUrl').notNullable();
          table.text('shortId').notNullable();
          table.text('shortenedUrl');
          table.integer('userId');
          table.integer('usageCount');
          table.timestamp('created_at').defaultTo(db.fn.now());
          table.timestamp('updated_at');
          table.timestamp('deleted_at');
        });
      }
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
    }
};

export const createUserTable = async () => {
  try {
    const exists = await db.schema.hasTable('users');

    if (!exists) {
      await db.schema.createTable('users', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
      });
      console.log('Tabela "users" criada com sucesso.');
    }
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
};
