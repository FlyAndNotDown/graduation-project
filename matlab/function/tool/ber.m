function output = ber(source, received)
% ber - byte error rate
%
% - Arguments:
%       - source [mxn logical matrix] source matrix
%       - received [mxn logical matrix] received matrix
%
% - Returns:
%       - output [double] byte error rate

[rows, cols] = size(source);
output = 0;
for n1 = 1 : rows
    for n2 = 1 : cols
        output = output + abs(source(n1, n2) - received(n1, n2));
    end
end
output = output / (rows * cols);

end