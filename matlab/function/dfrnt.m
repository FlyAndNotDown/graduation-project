function output = dfrnt(source, a, m, p)
%dfrnt - one-dimension DFRNT
%
% - Description:
%       the one dimension discrete fractional random transform
%
% - Arguments:
%       - source [1xn double matrix] 1xn source signal vector
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform, must be mutiple of 'a'
%       - p [nxn double matrix] a nxn key matrix, the item can be number from 0 to 1
%
% - Returns:
%       - output [1xn double matrix] the output signal vector 

% do the transposition to source matrix
source = source';

% get the kernal matrix of DFRNT
r = dfrntKernel(a, m, p);

% get the output matrix
output = r * source;
output = output';

end