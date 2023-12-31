export type buildMode = 'development' | 'production'
export interface buildPaths {
    entry: string;
    dist: string;
    html: string;
    src: string;
    localesFrom: string;
    localesTo: string;
    docsFrom: string;
    docsTo: string;
}

export interface BuildOptions {
    mode: buildMode
    paths: buildPaths
    isDev: boolean
    port: number
    apiUrl: string;
}

export interface BuildEnv {
    port: number
    mode: buildMode
    apiUrl: string;
    buildPath: string;
}
