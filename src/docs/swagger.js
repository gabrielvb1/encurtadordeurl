import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Encurtamento de URLs',
      version: '1.0.0',
      description: 'API para encurtar, redirecionar e gerenciar URLs encurtadas.'
    },
    servers: [
      {
        url: 'http://localhost:3033'
      },
    ],
    paths: {
        "/signup": {
            post: {
                summary: "Cadastro de Usuários",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/components/schemas/SignUp"
                            },
                            examples: {
                                user: {
                                    value: {
                                        name: "Joao da Silva",
                                        email: "joao@email.com",
                                        password: "123455"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "401": {
                        description: "E-mail já existe!",
                    },
                    "200": {
                        description: "Usuário Criado Com Sucesso"
                    }
                }
            }
        },
        "/login": {
            post: {
                summary: "Login de Usuários",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/components/schemas/Login"
                            },
                            examples: {
                                user: {
                                    value: {
                                        email: "joao@email.com",
                                        password: "123455"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "401": {
                        description: "E-mail ou senha inválidos",
                    },
                    "200": {
                        description: "Ok",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        "id": {
                                            "type": "integer",
                                            "description": "ID do usuário"
                                        },
                                        "name": {
                                            "type": "string",
                                            "description": "Nome do usuário"
                                        },
                                        "email": {
                                            "type": "string",
                                            "description": "Email do usuário"
                                        },
                                        "token": {
                                            "type": "string",
                                            "description": "Token JWT gerado para o usuário"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/shorturl": {
            post: {
                summary: "Cria urls encurtadas",
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/components/schemas/ShortUrl"
                            },
                            examples: {
                                url: {
                                    value: {
                                        bigUrl: "https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "400": {
                        description: "URL inválida ou ausente",
                    },
                    "200": {
                        description: "Ok",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        "originalUrl": {
                                            "type": "string"
                                        },
                                        "shortenedUrl": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/urls/users": {
            get: {
                summary: "Lista Urls encurtadas do usuário",
                security: [{bearerAuth: []}],
                responses: {
                    "401": {
                        description: "Acesso negado. Usuário não autenticado.",
                    },
                    "200": {
                        description: "Ok",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        "id": {
                                            "type": "integer"
                                        },
                                        "bigUrl": {
                                            "type": "string",
                                        },
                                        "shortId": {
                                            "type": "string",
                                        },
                                        "shortenedUrl": {
                                            "type": "string",
                                        },
                                        "userId": {
                                            "type": "integer",
                                        },
                                        "usageCount": {
                                            "type": "integer",
                                        },
                                        "created_at": {
                                            "type": "string",
                                        },
                                        "updated_at": {
                                            "type": "string",
                                        },
                                        "deleted_at": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/urls/shorturl": {
            put: {
                summary: "Edita uma url encurtada",
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/components/schemas/UpdateShortUrl"
                            },
                            examples: {
                                url: {
                                    value: {
                                        newBigUrl: "https://www.uol.com.br/",
                                        shortenedUrl: "http://localhost:3033/3dbd86"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "401": {
                        description: "O campo newBigUrl é obrigatório.",
                    },
                    "200": {
                        description: "Ok",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        "id": {
                                            "type": "integer"
                                        },
                                        "bigUrl": {
                                            "type": "string",
                                        },
                                        "shortId": {
                                            "type": "string",
                                        },
                                        "shortenedUrl": {
                                            "type": "string",
                                        },
                                        "userId": {
                                            "type": "integer",
                                        },
                                        "usageCount": {
                                            "type": "integer",
                                        },
                                        "created_at": {
                                            "type": "string",
                                        },
                                        "updated_at": {
                                            "type": "string",
                                        },
                                        "deleted_at": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/urls/{shortId}": {
            delete: {
                summary: "Deleta uma url encurtada",
                security: [{bearerAuth: []}],
                responses: {
                    "404": {
                        description: "URL não encontrada",
                    },
                    "400": {
                        description: "URL já foi excluída",
                    },
                    "403": {
                        description: "Você não tem permissão para excluir esta URL",
                    },
                    "200": {
                        description: "URL excluída com sucesso"
                    }
                },
                parameters: [
                    {
                    name: "shortId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        example: "3dbd86"
                    }
                }
             ],
            }
        },
       "/urls/redirect": {
            post: {
                summary: "Redireciona o usuário com base na URL encurtada",
                security: [{bearerAuth: []}],
                requestBody: {
                content: {
                    "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                        shortenedUrl: {
                            type: "string"
                        }
                        }
                    },
                    examples: {
                        url: {
                        value: {
                            shortenedUrl: "http://localhost:3033/3dbd86"
                        }
                        }
                    }
                    }
                }
                },
                responses: {
                "404": {
                    description: "URL não encontrada"
                },
                "302": {
                    description: "Redirecionamento",
                    headers: {
                    Location: {
                        description: "URL de redirecionamento",
                        type: "string",
                        example: "http://www.uol.com.br/"
                    }
                    }
                }
                }
            }
        }

    },
    components: {
        schemas: {
            SignUp: {
                properties: {
                    name: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },
            Login: {
                properties: {
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },
            ShortUrl: {
                properties: {
                    bigUrl: {
                        type: "string"
                    }
                }
            },
            UpdateShortUrl: {
                properties: {
                    newBigUrl: {
                        type: "string"
                    },
                    shortenedUrl: {
                        type: "string"
                    }
                }
            },
            UpdateShortUrl: {
                properties: {
                    shortenedUrl: {
                        type: "string"
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
  },
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
