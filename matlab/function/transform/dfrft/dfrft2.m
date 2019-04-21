function output = dfrft2(source, a)
%dfrft2 - two-dimension DFrFT
%
% - Arguments:
%       - source [nxn matrix] source signal matrix
%       - a [double] fractional order of DFrFT

[sRows, sCols, ~] = size(source);
output = source;

for n = 1 : sRows
    output(n, :) = dfrft(output(n, :)', a)';
end

for n = 1 : sCols
    output(:, n) = dfrft(output(:, n), a);
end

end