import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
    // home
    {
        path: '',
        component: HomePageComponent
    },
    // products
    {
        path: 'products',
        component: ProductsPageComponent
    },
    {
        path: 'products/:slug/:id',
        component: ProductPageComponent
    },
    // about
    {
        path: 'about',
        component: AboutPageComponent
    },
    // handling 404
    {
        path: '**', // tudo que não cai nos paths acima, caí em **
        component: Error404PageComponent
    },
]

export const RoutingModule = RouterModule.forRoot(routes);