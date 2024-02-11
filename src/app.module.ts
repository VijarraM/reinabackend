import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CorsModule } from '@nestjs/platform-express';
@Module({
  imports: [
    CorsModule.forRoot({
      origin: 'http://localhost:5173', // Aquí debes especificar el origen de tu aplicación React
      allowedHeaders: ['Content-Type', 'Authorization'], // Lista de encabezados permitidos
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    }),
    UserModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
