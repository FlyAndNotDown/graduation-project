source = im2double(imread('lena.bmp'));
secret = imread('secret4.bmp');

indexFile = fopen('dist/index.txt', 'w+');

p = rand(8, 8);
r = dfrntKernel(0.75, 1, p);
ir = dfrntKernel(-0.75, 1, p);

load('data/qdfrntModel.mat', 'model');

secretBers = zeros(1, 12);
x = zeros(1, 12);

fprintf(indexFile, 'testNo\t\trotatePercent\t\tber\n');
for n = 1 : 12
    x(1, n) = 30 * n;
    [output, kp] = qdfrntMark(source, secret, 3, r, ir, 13);
    output = imrotate(output, x(1, n), 'crop');
    output = imrotate(output, -x(1, n), 'crop');
    secretRestored = qdfrntRestore(output, model, kp, 3, r);
    secretBers(1, n) = ber(secret, secretRestored);

    imwrite(output, ['dist/', num2str(n), '-output.bmp']);
    imwrite(secretRestored, ['dist/', num2str(n), '-restored.bmp']);
    fprintf(indexFile, '%d\t\t\t%f\t\t\t\t%f\n', n, x(1, n), secretBers(1, n));
end

fclose(indexFile);
plot(x, secretBers);