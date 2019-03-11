function output = qdfrntMark(source, secret, ks)
%qdfrntMark - add watermark to a picture
%
% - Description:
%       add a watermark to picture, with QDFRNT function
%
% - Arguments:
%       - source [nxnx3 double matrix] matrix of colorful source image
%       - secret [mxm binary matrix] matrix of binary secret image
%       - ks [integer] a key of watermarking, the times of secret arnold transform
%
% - Returns:
%       - output [nxnx3 double matrix] output matrix

% do arnold transform to secret
secretArnold = arnold(secret, ks);

end