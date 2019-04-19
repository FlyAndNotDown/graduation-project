function output = dfrft2(source, len, a)
%DFRFT2 - two-dimension discrete fractional fourier transform
%
% - Arguments:
%       - source [mnxn double matrix] source matrix
%       - len [int] matrix length
%       - a [double] fractional order
%
% - Returns:
%       - output [nxn double matrix] output matrix

% init output
output = source;

% do transform
for n = 1 : len
    output(n, :) = dfrft(output(n, :)', len, a)';
end

for n = 1 : len
    output(:, n) = dfrft(output(:, n), len, a);
end

end