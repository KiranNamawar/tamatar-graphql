import schema from "./schema";
import { createYoga } from "graphql-yoga";

const yoga = createYoga({
    schema
});

export default yoga;