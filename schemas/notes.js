//前端送進來的資料檢查
//可以驗證跟轉換，就不用在商業邏輯中一直if else判斷

const { z } = require("zod");

const createNotesSchema = z.object({
  body: z.object({
    author: z.string().min(1, {
      message: "須至少一個字",
    }),
    content: z.string(),
  }),
});

const getNoteSchema = z.object({
  query: z
    .object({
      author: z.string().optional(),
      content: z.string().optional(),
    })
    .refine(
      (data) => {
        return data.content || data.author;
      },
      {
        message: "請提供content或author",
      }
    ),
});

module.exports = { createNotesSchema, getNoteSchema };
