function output = dfrft2(source, sRows, sCols, a)
%dfrft2 - two-dimension DFrFT
%
% - Arguments:
%       - source [nxn matrix] source signal matrix
%       - sRows [int] sRows count
%       - sCols [int] sCols count
%       - a [double] fractional order of DFrFT

output = source;

for n = 1 : sRows
    output(n, :) = DFpei(output(n, :)', a)';
end

for n = 1 : sCols
    output(:, n) = DFpei(output(:, n), a);
end

end