source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

indexFile = fopen('dist/index.txt', 'w+');

r = dfrftKernel(8, 0.5);
ir = dfrftKernel(8, -0.5);

load('data/qdfrftModel.mat', 'model');

secretBers = zeros(1, 20);
x = zeros(1, 20);

fprintf(indexFile, 'testNo\t\tcutPercent\t\tber\n');
for n = 1 : 20
    x(1, n) = 0.05 * n;
    [output, kp] = qdfrftMark(source, secret, 3, r, ir, 13);
    output = cut(output, x(1, n));
    secretRestored = qdfrftRestore(output, model, kp, 3, r);
    secretBers(1, n) = ber(cut(secret, x(1, n)), secretRestored);

    imwrite(output, ['dist/', num2str(n), '-output.bmp']);
    imwrite(secretRestored, ['dist/', num2str(n), '-restored.bmp']);
    fprintf(indexFile, '%d\t\t\t%f\t\t\t\t%f\n', n, x(1, n), secretBers(1, n));
end

fclose(indexFile);
plot(x, secretBers);