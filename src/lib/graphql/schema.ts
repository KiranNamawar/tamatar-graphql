import builder from "./pothos";
import '@/auth'

builder.queryType({})
builder.mutationType({})

const schema = builder.toSchema();

export default schema;
