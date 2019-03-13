function output = qdfrntMark(source, secret, ks, kt, ikt, intensity)
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
%       - intensity [double] the intensity of watermarking
%
% - Returns:
%       - output [nxnx3 double matrix] output matrix

% get size info
[sourceRow, ~, ~] = size(source);

% do arnold transform to secret
secretArnold = arnold(secret, ks);

% get binary secret sequence
secretSequence = matrixToVector(secretArnold);
[~, secretSequenceLength] = size(secretSequence);

% split picture to 8x8 smaller blocks
blocks = splitBlock(source, 8);
[~, blocksLength] = size(blocks);
[blockRow, ~, ~] = size(blocks{1, 1});

% set a pure unit quaternion
u = [0, 1, 0, 0];

% get adaptive factors of every blocks
adaptiveFactors = adaptiveFactor(blocks, 1);

% do QDFRNT to every blocks
encodedBlocks = cell(1, blocksLength);
for n = 1 : blocksLength
    [blockRow, blockCol, blockHeight] = size(blocks{1, n});
    t = zeros(blockRow, blockCol, blockHeight + 1);
    for n1 = 2 : 4
        t(:, :, n1) = blocks{1, n}(:, :, n1 - 1);
    end
    encodedBlocks{1, n} = lqdfrnt2(t, kt, kt, u);
end

% % add some info
% for n = 1 : blocksLength
%     if rem(n, 10) == 0
%         encodedBlocks{1, n}(1, 1, 3) = encodedBlocks{1, n}(1, 1, 3) + intensity;
%     end
% end

% start watermarking
x = 1;
over = false;
for channel = 3 : 4
    % if over, break
    if over
        break;
    end

    for n = 1 : blocksLength
        % if secret sequence mark over, break
        if x > secretSequenceLength
            over = true;
            break;
        end
    
        % if adaptive factor is 0, not do watermarking
        if adaptiveFactors(1, n) > 0
            % get channel 3 info of blocks
            blockChannel = encodedBlocks{1, n}(:, :, channel);
    
            % get sequence
            blockChannelSequence = zeros(64, 3);
            for n1 = 1 : 8
                for n2 = 1 : 8
                    if blockChannel(n1, n2) >= 0
                        blockChannelSequence((n1 - 1) * 8 + n2, 1) = blockChannel(n1, n2);
                    else
                        if blockChannel(n1, n2) < -1
                            blockChannelSequence((n1 - 1) * 8 + n2, 1) = 2 + blockChannel(n1, n2);
                        else
                            blockChannelSequence((n1 - 1) * 8 + n2, 1) = 1 + blockChannel(n1, n2);
                        end
                    end
                    blockChannelSequence((n1 - 1) * 8 + n2, 2) = n1;
                    blockChannelSequence((n1 - 1) * 8 + n2, 3) = n2;
                end
            end
    
            % sorting by sequence value
            for n1 = 1 : 63
                minIndex = n1;
                for n2 = n1 + 1 : 64
                    if blockChannelSequence(n2, 1) < blockChannelSequence(minIndex, 1)
                        minIndex = n2;
                    end
                end
                t = blockChannelSequence(n1, :);
                blockChannelSequence(n1, :) = blockChannelSequence(minIndex, :);
                blockChannelSequence(minIndex, :) = t;
            end
    
            % get middle sequence value's position
            t = 32;
            row = blockChannelSequence(t, 2);
            col = blockChannelSequence(t, 3);
            count = 1;
            flag = true;
            while ~(row >= 2 && row <= 7 && col >= 2 && col <= 7)
                if flag
                    t = t + count;
                else
                    t = t - count;
                end
                count = count + 1;
                flag = ~flag;
                row = blockChannelSequence(t, 2);
                col = blockChannelSequence(t, 3);
            end
    
            % get average
            average = 0;
            for n1 = -1 : 1
                for n2 = -1 : 1
                    average = average + blockChannel(row + n1, col + n2);
                end
            end
            average = (average - blockChannel(row, col)) / 8;
    
            % watermark
            encodedBlocks{1, n}(row, col, 3) = average + (2 * secretSequence(1, x) - 1) * adaptiveFactors(1, n) * intensity;
            x = x + 1;
        end
    end
end

% do ILQDFRNT to every blocks
for n = 1 : blocksLength
    encodedBlocks{1, n} = lqdfrnt2(encodedBlocks{1, n}, ikt, ikt, u);
    encodedBlocks{1, n} = encodedBlocks{1, n}(:, :, [2, 3, 4]);
end

% merge
output = mergeBlock(encodedBlocks, fix(sourceRow / blockRow));

end