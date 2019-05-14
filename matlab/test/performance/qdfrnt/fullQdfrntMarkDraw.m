indexFile = fopen('index.txt', 'r');
temp = fscanf(indexFile, '%s ', 8);

source = zeros(1000, 2);

for n = 1 : 1000
    testNo = fscanf(indexFile, '%f ', 1);
    fscanf(indexFile, '%s ', 1);
    temp = fscanf(indexFile, '%f ', 6);
    source(n, 1) = testNo;
    source(n, 2) = temp(5, 1);
end

fclose(indexFile);

plot(source(:, 1), source(:, 2));