% define source list & secret list
sources = {
    % 'airplane.tiff',
    'lena.bmp',
    'peppers.tiff',
    'baboon.tiff',
    'couple.tiff',
    'girl.tiff',
};
secrets = {
    'secret.bmp',
    'secret2.bmp',
    'secret3.bmp'
};

% file IO
indexFile = fopen('dist/index.txt', 'w+');
randomMatrixFile = fopen('dist/random-matrix.txt', 'w+');
fprintf(indexFile, 'testNo\t\trMatrixNo\t\torder\t\tcycle\t\taOrder\t\tssimSource\t\tssimSecret\n');

% load SVM model
load('data/model.mat', 'model');

% init random matrix list
randomMatrixes = cell(1, 1000);
for n = 1 : 1000
    randomMatrixes{1, n} = rand(8, 8);
    fprintf(randomMatrixFile, 'No.%d: \n', n);
    for n1 = 1 : 8
        for n2 = 1 : 8
            fprintf(randomMatrixFile, '%f\t', randomMatrixes{1, n}(n1, n2));
        end
        fprintf(randomMatrixFile, '\n');
    end
    fprintf(randomMatrixFile, '\n');
end

% init order list
orders = zeros(1, 1000);
for n = 1 : 1000
    orders(1, n) = rand() * 100;
end

% init cycle list
cycles = zeros(1, 1000);
for n = 1 : 1000
    cycles(1, n) = floor(rand() * 100 + 1);
end

% init aOrder list
aOrders = zeros(1, 1000);
for n = 1 : 1000
    aOrders(1, n) = floor(rand() * 100 + 1);
end

% get size info
[~, randomMatrixesLength] = size(randomMatrixes);
[~, ordersLength] = size(orders);
[~, cyclesLength] = size(cycles);
[~, aOrdersLength] = size(aOrders);
[~, sourcesLength] = size(sources);
[~, secretsLength] = size(secrets);

% full test
testNo = 1;
for n = 1 : 1000
    % get random params set
    sourceNo = floor(rand() * sourcesLength + 1);
    secretNo = floor(rand() * secretsLength + 1);
    randomMatrixNo = floor(rand() * randomMatrixesLength + 1);
    orderNo = floor(rand() * ordersLength + 1);
    cycleNo = floor(rand() * cyclesLength + 1);
    aOrderNo = floor(rand() * aOrdersLength + 1);
    
    % load images
    source = im2double(imread(sources{1, sourceNo}));
    secret = imread(secrets{1, secretNo});

    % do watermark
    [output, kp] = qdfrntMark(source, secret, aOrders(1, aOrderNo), kernel, iKernel, 0.05);
    [ssimSource, ~] = ssim(source, output);
    restored = qdfrntRestore(output, model, kp, aOrders(1, aOrderNo), kernel);
    [ssimSecret, ~] = ssim(im2uint8(secret), im2uint8(restored));
    imwrite(output, ['dist/', num2str(testNo), '-output.bmp']);
    imwrite(restored, ['dist/', num2str(testNo), '-restored.bmp']);
    fprintf(indexFile, '%d\t\t\t%d\t\t\t%f\t\t%d\t\t\t%d\t\t\t%f\t\t%f\n', testNo, randomMatrixNo, orders(1, orderNo), cycles(1, cycleNo), aOrders(1, aOrderNo), ssimSource, ssimSecret);
    testNo = testNo + 1;
end

% close file
fclose(indexFile);
fclose(randomMatrixFile);