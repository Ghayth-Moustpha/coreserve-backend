import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, description, version } from 'package.json'; // Ensure the path to package.json is correct

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(name) // Dynamically set title from package.json
    .setDescription(description) // Dynamically set description from package.json
    .setVersion(version) // Dynamically set version from package.json
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Conditionally save Swagger spec files during development
  if (process.env.NODE_ENV !== 'production') {
    const jsonFilePath = path.join(__dirname, '..', 'swagger-spec.json');
    const yamlFilePath = path.join(__dirname, '..', 'swagger.yaml');

    // Write Swagger spec as JSON
    fs.writeFileSync(jsonFilePath, JSON.stringify(document, null, 2));

    // Write Swagger spec as YAML
    const yamlString = YAML.stringify(document, { indent: 2 });
    fs.writeFileSync(yamlFilePath, yamlString);
  }

  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document);
}
