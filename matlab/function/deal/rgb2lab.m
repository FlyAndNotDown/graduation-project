function result = rgb2lab(source)
%rgb2lab - change color space from RGB to CIELab
%
% - Description:
%       change color space from RGB to CIELab
%
% - Arguments:
%       - source [1x3 double{[0, 1]} matrix] RGB source matrix
%
% - Returns:
%       - result [1x3 double{[0, 1]} matrix] CIELab result matrix

% get three channals of RGB space
r = source(1, 1);
g = source(1, 2);
b = source(1, 3);

% get gamma value of RGB
gammaR = rgb2labGamma(r);
gammaG = rgb2labGamma(g);
gammaB = rgb2labGamma(b);

% change space from RGB to XYZ
m = [0.4124, 0.3576, 0.1805; 0.2126, 0.7152, 0.0722; 0.0193, 0.1192, 0.9505];
gammaRgb = [gammaR; gammaG; gammaB];
xyz = m * gammaRgb;
x = xyz(1, 1);
y = xyz(2, 1);
z = xyz(3, 1);

% change space from XYZ to CIELab
xn = 95.047;
yn = 100.0;
zn = 108.883;
result = [0, 0, 0];


end