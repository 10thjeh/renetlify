import { json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({request}){
    if(request.method !== 'POST'){
        throw json({message: 'invalid request method'}, {status: 404});
    }
    return destroyUserSession(request);
}