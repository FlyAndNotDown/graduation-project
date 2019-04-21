function output = dfrft2(source, rows, cols, a)

output = source;

for n = 1 : rows
    output(n, :) = DFpei(output(n, :)', a)';
end

for n = 1 : cols
    output(:, n) = DFpei(output(:, n), a);
end

end