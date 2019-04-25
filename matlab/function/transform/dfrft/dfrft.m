function output = dfrft(source, len, tKernel)
%dfrft - DFrFT transform
%
% - Arguments:
%       - source [nx1 matrix] source signal matrix
%       - len [int] length of source matrix
%       - tKernel [nxn matrix] kernel matrix of DFrFT

shift = rem((0 : len - 1) + fix(len / 2), len) + 1;
output = tKernel * source(shift);
output(shift, 1) = output;

end