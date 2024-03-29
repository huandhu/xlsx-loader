import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
export default (fixture, options) => {
    const compiler = webpack({
        context: __dirname,
        entry: `./${fixture}`,
        mode: "development",
        output: {
            path: path.resolve(__dirname),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.xls.?$/,
                use: {
                    loader: path.resolve(__dirname, '../src/index.js'),
                    options
                }
            }]
        }
    });

    compiler.outputFileSystem = createFsFromVolume(new Volume());
    compiler.outputFileSystem.join = path.join.bind(path);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(stats.toJson().errors);

            resolve(stats);
        });
    });
}