function output = dfrft2(source, len, tKernel)
%dfrft2 - two-dimension DFrFT
%
% - Arguments:
%       - source [nxn matrix] source signal matrix
%       - len [int] length of source matrix
%       - tKernel [nxn matrix] tKernel of dfrft

output = source;

for n = 1 : len
    output(n, :) = dfrft(output(n, :)', len, tKernel)';
end

for n = 1 : len
    output(:, n) = dfrft(output(:, n), len, tKernel);
end

end