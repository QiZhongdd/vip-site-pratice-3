import React, { FC,Suspense } from "react";
import { Route, Switch, RouteProps } from "react-router";
import Loading from '@components/Loading/Loading';
import NotFound from '@pages/NotFound/NotFound';
const Home = React.lazy(() => import("@pages/Home/Home"));
const Login = React.lazy(() => import("@pages/Login/Login"));
const QuesBank = React.lazy(() => import("@pages/QuesBank/QuesBank"));
const QuesInfo = React.lazy(() => import("@pages/QuesInfo/quesInfo"));


// 定义路由集合
export const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/ques",
    exact: true,
    component: QuesBank,
  },
  {
    path: "/ques/info",
    exact: true,
    component: QuesInfo,
  },

];

// 定义路由组件
const Routes:FC = ()=>{
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {
                    routes.map((r,index)=>{
                        const {path,exact,component} = r;
                        const LazyCom = component;
                        return (
                            <Route
                                key={index}
                                path={path}
                                exact={exact}
                                render={
                                    (props)=><LazyCom {...props} />
                                }
                             />
                        )
                    })
                }
                {/* 兜底的路由 */}
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    )
}

export default Routes;