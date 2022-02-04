# Hello &lt;Insert Company Here&gt;

## Running

You will need node 14, and yarn.

### Install UI deps

```
yarn # to install ui deps
cd server && yarn # to install server deps
```

### Start Server on port 5000

To start server: `yarn start:server`

### Start UI on port 3000

In another terminal: ``yarn dev` to start server

## Server Notes

The server is implemented in terms of openapi. By using fastify-swagger I get self hosted docs, and fastify-openapi-glue I get a validating API which returns errors in terms of the specification, making my business logic handlers very small and simple.

The server implements no storage. Everything is just in a singleton. For the test API I only print to the server's console. I do not return all the items to the client. It wasn't clear from the spec if this was required.

If this was not what you wanted, I apologise.

The server code lives in `server/` and can be started with logging using `yarn start:server`

## UI

The UI is implemented using vue 3, typescript and vite, Because
it's fun. I would assume you are mostly running vue2 in prod. I am
still new to the composition API, and the options API still works.

Also there are some breaking changes to v-model that caught me out, as it's been a while since I used it with vue3. There's an interesting new script attribute called setup which makes typescript more pleasant to use.

Because I'm using it elsewhere, I also threw in windicss.

I did not want to depend on too many 3rd party libraries, so I
deliberately hand coded the, except for the email. I hope that's
ok. Normally I would use something like vuelidate and prefer forms
to be data driven at scale.

I did not use vuex, and am just using the plain vue3 observability APIs. On larger applications I prefer to have something like vuex because it allows clean cross component communication, but that didn't seem warranted here.

Organization is bog standard Vue, with components living in components. I also deliberately chose not to use any third party component libraries, which would have made things much easier. Sometimes it's useful to know how the sausage is made.

Most of the business logic is in Main.vue. I did not extract it out into it's own related files, but that would have been possible because of the composition API.
