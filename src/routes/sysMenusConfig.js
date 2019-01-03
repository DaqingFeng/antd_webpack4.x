export const sysMenusConfig = [
    {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes":
            [{
                "path": "/dashboard/analysis",
                "name": "analysis",
                "exact": true
            },
            {
                "path": "/dashboard/monitor",
                "name": "monitor",
                "exact": true
            },
            {
                "path": "/dashboard/workplace",
                "name": "workplace",
                "exact": true
            }]
    },
    {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes":
            [{
                "path": "/form/basic-form",
                "name": "basicform",
                "exact": true
            },
            {
                "path": "/form/step-form",
                "name": "stepform",
                "hideChildrenInMenu": true,
                "routes": [{
                    "path": "/form/step-form/info",
                    "name": "info",
                    "exact": true
                },
                {
                    "path": "/form/step-form/confirm",
                    "name": "confirm",
                    "exact": true
                },
                {
                    "path": "/form/step-form/result",
                    "name": "result",
                    "exact": true
                }]
            },
            {
                "path": "/form/advanced-form",
                "name": "advancedform",
                "exact": true
            }]
    },
    {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [{
            "path": "/list/table-list",
            "name": "searchtable",
            "exact": true
        },
        {
            "path": "/list/basic-list",
            "name": "basiclist",
            "exact": true
        }, {
            "path": "/list/card-list",
            "name": "cardlist",
            "exact": true
        },
        {
            "path": "/list/search",
            "name": "searchlist",
            "routes": [{
                "path": "/list/search/articles",
                "name": "articles",
                "exact": true
            },
            {
                "path": "/list/search/projects",
                "name": "projects",
                "exact": true
            },
            {
                "path": "/list/search/applications",
                "name": "applications",
                "exact": true
            }]
        }]
    },
    {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [{
            "path": "/profile/basic",
            "name": "basic",
            "exact": true
        },
        {
            "path": "/profile/advanced",
            "name": "advanced",
            "exact": true
        }]
    },
    {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes":
            [{
                "path": "/result/success",
                "name": "success",
                "exact": true
            },
            {
                "path": "/result/fail",
                "name": "fail",
                "exact": true
            },
            {
                "path": "/result/other",
                "name": "other",
                "exact": true
            }]
    },
    {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes":
            [{
                "path": "/exception/403",
                "name": "not-permission",
                "exact": true
            },
            {
                "path": "/exception/404",
                "name": "not-find",
                "exact": true
            },
            {
                "path": "/exception/500",
                "name": "server-error",
                "exact": true
            },
            {
                "path": "/exception/trigger",
                "name": "trigger",
                "hideInMenu": true,
                "exact": true
            }]
    },
    {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes":
            [{
                "path": "/account/center",
                "name": "center",
                "routes":
                    [{
                        "path": "/account/center/articles",
                        "exact": true
                    },
                    {
                        "path": "/account/center/applications",
                        "exact": true
                    }, {
                        "path": "/account/center/projects",
                        "exact": true
                    }]
            },
            {
                "path": "/account/settings",
                "name": "settings",
                "routes": [{
                    "path": "/account/settings/base",
                    "exact": true
                },
                {
                    "path": "/account/settings/security",
                    "exact": true
                }, {
                    "path": "/account/settings/binding",
                    "exact": true
                },
                {
                    "path": "/account/settings/notification",
                    "exact": true
                }]
            }]
    },
    {
        "exact": true
    }];