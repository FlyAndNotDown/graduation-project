% define source list & secret list
sources = {
    'airplane.tiff',
    'baboon.tiff',
    'couple.tiff',
    'girl.tiff',
    'lena.bmp',
    'peppers.tiff'
};
secrets = {
    'secret.bmp',
    'secret2.bmp',
    'secret3.bmp'
};

% file IO
indexFile = fopen('dist/index.txt', 'w+');
randomMatrixFile = fopen('dist/random-matrix.txt', 'w+');
fprintf(indexFile, 'imageNo\t\trMatrixNo\t\torder\t\tcycle\t\taOrder\t\tintensity\t\tssimSource\t\tssimSecret\n');

% load SVM model
load('data/model.mat', 'model');

% init random matrix list
randomMatrixes = cell(1, 10);
for n = 1 : 5
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
orders = zeros(1, 10);
for n = 1 : 10
    orders(1, n) = 0.1 * n;
end

% init cycle list
cycles = zeros(1, 10);
for n = 1 : 5
    cycles(1, n) = n;
end

% init aOrder list
aOrders = zeros(1, 5);
for n = 1 : 5
    aOrders(1, n) = n;
end

% init intensity list
intensities = zeros(1, 5);
for n = 1 : 5
    intensities(1, n) = 0.02 * n;
end

% get size info
[~, randomMatrixesLength] = size(randomMatrixes);
[~, ordersLength] = size(orders);
[~, cyclesLength] = size(cycles);
[~, aOrdersLength] = size(aOrders);
[~, intensitiesLength] = size(intensities);
[~, sourcesLength] = size(sources);
[~, secretsLength] = size(secrets);

% full test
imageNo = 1;
for sourceNo = 1 : sourcesLength
    for secretNo = 1 : secretsLength
        % load images
        source = im2double(imread(sources{1, sourceNo}));
        secret = imread(secrets{1, secretNo});
        for randomMatrixNo = 1 : randomMatrixesLength
            for orderNo = 1 : ordersLength
                for cycleNo = 1 : cyclesLength
                    % get kernel
                    kernel = dfrntKernel(orders(1, orderNo), cycles(1, cycleNo), randomMatrixes{1, randomMatrixNo});
                    iKernel = dfrntKernel(0 - orders(1, orderNo), cycles(1, cycleNo), randomMatrixes{1, randomMatrixNo});
                    for aOrderNo = 1 : aOrdersLength
                        for intensityNo = 1 : intensitiesLength
                            % do watermark
                            [output, kp] = qdfrntMark(source, secret, aOrders(1, aOrderNo), kernel, iKernel, intensities(1, intensityNo));
                            [ssimSource, ~] = ssim(source, output);
                            restored = qdfrntRestore(output, model, kp, aOrders(1, aOrderNo), kernel);
                            [ssimSecret, ~] = ssim(im2uint8(secret), im2uint8(restored));
                            imwrite(output, ['dist/', num2str(imageNo), '-output.bmp']);
                            imwrite(restored, ['dist/', num2str(imageNo), '-restored.bmp']);
                            fprintf(indexFile, '%d\t\t%d\t\t%f\t\t%d\t\t%d\t\t%f\t\t%f\t\t%f\n', imageNo, randomMatrixNo, orders(1, orderNo), cycles(1, cycleNo), aOrders(1, aOrderNo), intensities(1, intensityNo), ssimSource, ssimSecret);
                            imageNo = imageNo + 1;
                        end
                    end
                end
            end
        end
    end
end

% close file
fclose(indexFile);
fclose(randomMatrixFile);