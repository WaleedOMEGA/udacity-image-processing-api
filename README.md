# udacity-image-processing-api

this project aims to convert images from full size to any size you want

# technology used in this project

- sharp : library for converting images
- jasmine : for testing

# Scripts

- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

## The server will listen on port 3000

### api endpoint for converting images
<http://localhost:3000/api/images>

#### Example
<http://localhost:3000/api/images?filename=icelandwaterfall&width=200&height=200>
Will scale the icelandwaterfall image to 200 by 200 pixels and store the resulting image.
and if you call it again it will get the resulting image from cashing instead of converting this image again.
