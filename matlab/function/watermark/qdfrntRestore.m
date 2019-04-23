function secret = qdfrntRestore(source, model, kp, ks, kt)
%qdfrntRestore - restore watermark in image
%
% - Arguments:
%       - source [nxnx3 double matrix] matrix of colorful source image
%       - model [trained svm model] trained svm model
%       - kp [kx4 integer matrix] mark location key
%       - ks [integer] the times of secret arnold transform
%       - kt [8x8 double matrix] the kernel matrix of DFRNT, can be generated by function 'dfrntKernel'
%
% - Returns:
%       - secret [mxmx3 double matrix] watermark matrix

% init secret sequence
secretSequence = [];
secretCount = 1;

% get size info
[sourceRow, ~, ~] = size(source);
[kpRow, ~, ~] = size(kp);

% split picture to 8x8 smaller blocks
blocks = splitBlock(source, 8);
[~, blocksLength] = size(blocks);
[blockRow, ~, ~] = size(blocks{1, 1});

% set a pure unit quaternion
u = [0, 1, 0, 0];

% do QDFRNT to every blocks
encodedBlocks = cell(1, blocksLength);
for n = 1 : blocksLength
    t = zeros(blockRow, blockRow, 4);
    for n1 = 2 : 4
        t(:, :, n1) = blocks{1, n}(:, :, n1 - 1);
    end
    encodedBlocks{1, n} = lqdfrnt2(t, 8, kt, u);
end

% for every position, do some thing
for n = 1 : kpRow
    % get info
    blockIndex = kp(n, 1);
    channel = kp(n, 2);
    row = kp(n, 3);
    col = kp(n, 4);

    % calculate svm input data
    blockChannel = encodedBlocks{1, blockIndex}(:, :, channel);
    svmInput = zeros(1, 9);
    average = 0;
    for n1 = -1 : 1
        for n2 = -1 : 1
            average = average + blockChannel(row + n1, col + n2);
        end
    end
    average = (average - blockChannel(row, col)) / 8;
    for n1 = -1 : 1
        for n2 = -1 : 1
            index = (n1 + 1) * 3 + n2 + 2;
            if n1 == 0 && n2 == 0
                svmInput(1, index) = blockChannel(row, col) - average;
            else
                svmInput(1, index) = blockChannel(row, col) - blockChannel(row + n1, col + n2);
            end
        end
    end

    % get predict result
    predictResult = predict(model, svmInput);
    distanceToZero = abs(predictResult - 0);
    distanceToOne = abs(predictResult - 1);
    if distanceToZero > distanceToOne
        secretSequence(1, secretCount) = 1;
    else
        secretSequence(1, secretCount) = 0;
    end
    secretCount = secretCount + 1;
end

% change secret sequence to matrix
[~, secretSequenceLength] = size(secretSequence);
secret = vectorToMatrix(secretSequence, floor(sqrt(secretSequenceLength)));

% iarnold
secret = iarnold(secret, ks);

end