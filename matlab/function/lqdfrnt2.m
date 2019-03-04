function output = lqdfrnt2(source, a, m, pr, pc, u)
%lqdfrnt2 - two-dimension LQDFRNT
%
% - Description:
%       the two-dimension left quaternion discrete fractional random transform
%
% - Arguments:
%       - source [mxnx4 double matrix] mxnx4 source signal matrix
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform, must be mutiple of 'a'
%       - pr [nxn double matrix] a nxn key matrix, it will be used when row 1-d LQDFRNT, item can be number from 0 to 1
%       - pc [mxm double matrix] a mxm key matrix, it will be used when col 1-d LQDFRNT, item can be number from 0 to 1
%       - u [1x4 vector] a unit pure quaternion vector
%
% - Returns:
%       - output [mxnx4 double matrix] mxnx4 output signal matrix
%
% - Tips:
%       some u examples:
%       - [0 1 0 0]
%       - [0 0 1 0]
%       - [0 0 0 1]

end