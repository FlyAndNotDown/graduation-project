function output = dfrft(source, kernel)
%dfrft - discrete fractional fourier transform with GSA/OPA method
%
% - Arguments:
%       - source [nx1 vector] source vector
%       - kernel [nxn matrix] kernel matrix, can get it by dfrftKernel()
%
% - Returns:
%       - output [nx1 vector] output vector

% do transform
output = kernel * source;

end