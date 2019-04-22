function output = dfrft2(source, kernel)
%dfrft2 - two-dimension DFrFT
%
% - Arguments:
%       - source [nxn matrix] source signal matrix
%       - kernel [nxn matrix] kernel of dfrft

[sRows, sCols, ~] = size(source);
output = source;

for n = 1 : sRows
    output(n, :) = dfrft(output(n, :)', kernel)';
end

for n = 1 : sCols
    output(:, n) = dfrft(output(:, n), kernel);
end

end