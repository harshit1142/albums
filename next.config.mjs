import withTM from 'next-transpile-modules';

const withTranspileModules = withTM(['@shadcn/ui']);

const nextConfig = {
    reactStrictMode: true,
};

export default withTranspileModules(nextConfig);
