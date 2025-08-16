import * as z from "zod";

const snippetValidation = z.object({
    title:z
        .string()
        .max(100,{error:"Title cannot be longer than 100 characters."}),

    content:z
        .string()
        .min(1,{error:"Content cannot be empty"}),

    language:z
        .string()
        .min(1,{error:"Language cannot be empty"})
        .default("plaintext"),

    expiryTime:z
        .enum(["10m","30m","1h","1d","1w"])
        .optional(),
})

const snippetUpdateValidation = z.object({
        title:z
        .string()
        .max(100,{error:"Title cannot be longer than 100 characters."})
        .optional(),

    content:z
        .string()
        .min(1,{error:"Content cannot be empty"})
        .optional(),

    language:z
        .string()
        .min(1,{error:"Language cannot be empty"})
        .optional(),

    expiryTime:z
        .enum(["10m","30m","1h","1d","1w"])
        .optional(),
}).refine(
    data=>Object.keys(data).length>0,
    {error:"At least one field must be provided for update"}
)

export {snippetValidation,snippetUpdateValidation};