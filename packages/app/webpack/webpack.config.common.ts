import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"

export const commonConfig: webpack.Configuration = {
  entry: `./src/index.tsx`,
  // https://webpack.js.org/plugins/split-chunks-plugin/
  optimization: {
    splitChunks: {
      chunks: `all`,
      minSize: 500,
      minRemainingSize: 0,
      minSizeReduction: 400,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
      {
        test: /\.tsx?$/,
        use: `ts-loader`,
        exclude: /node_modules/,
      },
      {
        test: /kite_wasm\.js$/,
        loader: `exports-loader`,
        options: {
          type: `module`,
          // this MUST be equivalent to EXPORT_NAME in complile.sh
          exports: [`kite`],
        },
      },
      // wasm files should not be processed but just be emitted and we want
      // to have their public URL.
      {
        test: /kite_wasm\.wasm$/,
        type: `javascript/auto`,
        loader: `file-loader`,
        // options: {
        // if you add this, wasm request path will be https://domain.com/publicpath/[hash].wasm
        //   publicPath: `static/`,
        // },
      },
    ],
  },
  resolve: {
    extensions: [`.tsx`, `.ts`, `.js`],
  },
  output: {
    filename: `[hash].[name].js`,
    path: path.resolve(__dirname, `..`, `dist`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `..`, `public`, `index.html`),
      favicon: path.join(__dirname, `..`, `public`, `risc-v-logo.png`),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `public/robots.txt`, to: `robots.txt` }],
    }),
  ],
}
