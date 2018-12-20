# papu-front

### Environment variables
- **PORT** (default: 5000)
- **API_URL**

### Run the development build
`API_URL=http://localhost:8080 npm start`

### Run the production build
`API_URL=http://localhost:8080 npm run production`

`Production` script runs `npm run build` and then `npm run serve`. Only the latter requires API_URL env variable.
