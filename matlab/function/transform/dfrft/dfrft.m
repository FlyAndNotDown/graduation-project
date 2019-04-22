function output = dfrft(source, tKernel)
%dfrft - DFrFT transform
%
% - Arguments:
%       - source [nx1 matrix] source signal matrix
%       - tKernel [nxn matrix] kernel matrix of DFrFT

output = tKernel * source;

end