function output = lqdfrnt(source, r, u)
%lqdfrnt - one-dimension LQDFRNT
%
% - Description:
%       the one-dimension left quaternion discrete franctional random transform
%
% - Arguments:
%       - source [1xnx4 double matrix] 1xnx4 source signal matrix
%       - r [nxn double matrix] kernel matrix of transform, can be generated by function 'dfrntKernel'
%       - u [1x4 vector] a unit pure quaternion vector
%
% - Returns:
%       - output [1xnx4 double matrix] 1xnx4 output signal matrix
%
% - Tips:
%       some u examples:
%       - [0 1 0 0]
%       - [0 0 1 0]
%       - [0 0 0 1]

% get size info
[sourceRows, sourceCols, sourceHeight] = size(source);

% get child source matrix
sourceR = source(:, :, 1);
sourceI = source(:, :, 2);
sourceJ = source(:, :, 3);
sourceK = source(:, :, 4);

% get three imaginary unit of unit pure quaternion
ua = u(1, 2);
ub = u(1, 3);
uc = u(1, 4);

% do the 1-d DFRNT to every child source matrix
outputR = dfrnt(sourceR, r);
outputI = dfrnt(sourceI, r);
outputJ = dfrnt(sourceJ, r);
outputK = dfrnt(sourceK, r);

% get real part and imaginary part
outputRealR = real(outputR);
outputRealI = real(outputI);
outputRealJ = real(outputJ);
outputRealK = real(outputK);
outputImagR = imag(outputR);
outputImagI = imag(outputI);
outputImagJ = imag(outputJ);
outputImagK = imag(outputK);

% output
output = zeros(sourceRows, sourceCols, sourceHeight);
output(:, :, 1) = outputRealR - ua * outputImagI - ub * outputImagJ - uc * outputImagK;
output(:, :, 2) = outputRealI + ua * outputImagR - uc * outputImagJ + ub * outputImagK;
output(:, :, 3) = outputRealJ + ub * outputImagR - ua * outputImagK + uc * outputImagI;
output(:, :, 4) = outputRealK + uc * outputImagR - ub * outputImagI + ua * outputImagJ;

end