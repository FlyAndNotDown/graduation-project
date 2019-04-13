% init source matrix
source = [1, 2, 3, 4]';

% get a random matrix
p = rand(4, 4);

% calculate the kernal matrix of DFRNT
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% output after one time DFRNT
output = dfrnt(source, r);

% matrix restored from output matrix
reSource = dfrnt(output, ir);

% output after four time DFRNT
output4 = dfrnt(output, r);
output4 = dfrnt(output4, r);
output4 = dfrnt(output4, r);