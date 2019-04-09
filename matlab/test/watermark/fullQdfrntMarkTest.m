% define source list & secret list
sourceList = {
    'airplane.tiff',
    'baboon.tiff',
    'couple.tiff',
    'girl.tiff',
    'lena.bmp',
    'peppers.tiff'
};
secretList = {
    'secret.bmp',
    'secret2.bmp',
    'secret3.bmp'
};
[~, sourceNum] = size(sourceList);
[~, secretNum] = size(secretList);

% file IO
indexFile = fopen('dist/index.txt', 'w+');
randomMatrixFile = fopen('dist/random-matrix.txt', 'w+');
fprintf(indexFile, 'imageNo\t\trMatrixNo\t\torder\t\tcycle\t\taOrder\t\tintensity\t\tssim\n');

% load SVM model
load('data/model.mat', 'model');

% init random matrix
randomMatrixes = cell(1, 10);
for n = 1 : 10
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

% full test
% TODO

% close file
fclose(indexFile);
fclose(randomMatrixFile);