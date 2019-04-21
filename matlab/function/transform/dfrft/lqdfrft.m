function output = lqdfrft(source, a, u)
%lqdfrft - one-dimension LQDFrFT
%
% - Arguments:
%       - source [nx1x4 double matrix] source quaternion signal vector
%       - a [double] frational order of transform
%       - [1x4 vector] a unit pure quaternion vector
%
% - Returns:
%       - output [nx1x4 double matrix] nx1x4 output quaternion signal matrix

% get child source matrix
sourceR = source(:, :, 1);
sourceI = source(:, :, 2);
sourceJ = source(:, :, 3);
sourceK = source(:, :, 4);

% get three imaginary unit of unit pure quaternion
ua = u(1, 2);
ub = u(1, 3);
uc = u(1, 4);

% do the 1-d DFrFT to every child source matrix
outputR = DFpei(sourceR, a);
outputI = DFpei(sourceI, a);
outputJ = DFpei(sourceJ, a);
outputK = DFpei(sourceK, a);

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
output = source;
output(:, :, 1) = outputRealR - ua * outputImagI - ub * outputImagJ - uc * outputImagK;
output(:, :, 2) = outputRealI + ua * outputImagR - uc * outputImagJ + ub * outputImagK;
output(:, :, 3) = outputRealJ + ub * outputImagR - ua * outputImagK + uc * outputImagI;
output(:, :, 4) = outputRealK + uc * outputImagR - ub * outputImagI + ua * outputImagJ;

end