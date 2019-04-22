function output = dfrft(source, tKernel)
%dfrft - DFrFT transform
%
% - Arguments:
%       - source [nx1 matrix] source signal matrix
%       - tKernel [nxn matrix] kernel matrix of DFrFT

nth = length(source);
shift = rem((0 : nth - 1) + fix(nth / 2), nth) + 1;
output = tKernel * source(shift);
output(shift, 1) = output;

end