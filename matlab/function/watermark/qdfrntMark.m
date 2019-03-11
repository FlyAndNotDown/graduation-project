function output = qdfrntMark(source, secret, ks, kt, ikt)
%qdfrntMark - add watermark to a picture
%
% - Description:
%       add a watermark to picture, with QDFRNT function
%
% - Arguments:
%       - source [nxnx3 double matrix] matrix of colorful source image
%       - secret [mxm binary matrix] matrix of binary secret image
%       - ks [integer] a key of watermarking, the times of secret arnold transform
%       - kt [8x8 double matrix] kernel matrix of transform, can be generated by function 'dfrntKernel'
%       - ikt [8x8 double matrix] the kernel matrix which is used to restored transform
%
% - Returns:
%       - output [nxnx3 double matrix] output matrix

% do arnold transform to secret
secretArnold = arnold(secret, ks);

% get binary secret sequence
secretSequence = matrixToVector(secretArnold);

% split picture to 8x8 smaller blocks
blocks = splitBlock(source, 8);
[~, blocksLength] = size(blocks);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% do QDFRNT to every blocks
encodedBlocks = cell(1, blocksLength);
for n = 1 : blocksLength
    [blockRow, blockCol, blockHeight] = size(blocks{1, n});
    t = zeros(blockRow, blockCol, blockHeight + 1);
    for n = 2 : 4
        t(:, :, n) = blocks{1, n}(:, :, n - 1);
    end
    encodedBlocks{1, n} = lqdfrnt2(t, kt, kt, u);
end

% get adaptive factor of every block
adaptiveFactors = adaptiveFactor(blocks, 1);

end