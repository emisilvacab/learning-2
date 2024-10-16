
import path from 'path';
// The path node library will tell webpack where to place the bundle.
import HtmlWebpackPlugin from 'html-webpack-plugin';
// HtmlWebpackPlugin will be used to create index.html.
import {
  Configuration as WebpackConfig,
  HotModuleReplacementPlugin,
} from 'webpack';
// The webpack configuration TypeScript types come from both the webpack and webpackdev-server packages.
// So, we combine them using an intersect type, creating a type called Configuration.
import {
  Configuration as WebpackDevServerConfig
} from 'webpack-dev-server';

type Configuration = WebpackConfig & {
  devServer?: WebpackDevServerConfig;
}

const config: Configuration = {
  mode: 'development',
  // The mode property tells webpack the configuration is for development, meaning that the React development tools are included in the bundle
  output: {
    publicPath: '/',
  },
  // The output.publicPath property is the root path in the app, which is important for deep linking in the dev server to work correctly
  entry: './src/index.tsx',
  // The entry property tells webpack where the React app’s entry point is, which is index. tsx in our project

  // The module property informs webpack how different modules should be processed. We need to tell webpack to use babel-loader for files with .js, .ts, and .tsx extensions.
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  // The resolve.extensions property tells webpack to look for TypeScript files and JavaScript files during module resolution.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // As mentioned earlier, HtmlWebpackPlugin creates the HTML file. It has been configured to use index.html in the src folder as a template.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // HotModuleReplacementPlugin allows modules to be updated while an application is running, without a full reload.
    new HotModuleReplacementPlugin(),
  ],
  // The devtool property tells webpack to use full inline source maps, which allow the original source code to be debugged before transpilation.
  devtool: 'inline-source-map',
  // The devServer property configures the webpack development server. It configures the web server root to be the dist folder and to serve files on port 4000
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  }
};

// Webpack expects the configuration object to be a default export, so we export the config object as a default export
export default config;
