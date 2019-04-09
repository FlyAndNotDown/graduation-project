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

% full test
for sourceNo = 1 : sourceNum
    for secretNum = 1 : secretNum
        % TODO
    end
end

% close file
fclose(indexFile);
fclose(randomMatrixFile);