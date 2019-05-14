import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TypographyComponent }   from './typography/typography.component';
import { MenuComponent } from './rootmodule/menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
    {   path:'sign-in',
        component:SignInComponent
    },
    {
        path: 'menus',
        component: MenuComponent,
        children:[
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'Category',
                component: UserComponent
            },
            {
                path: 'Report',
                component: TypographyComponent
            }
        ]
    },


]
