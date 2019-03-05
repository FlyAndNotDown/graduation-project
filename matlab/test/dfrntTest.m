source = [1, 2, 3, 4];
p = rand(4, 4);

r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

output = dfrnt(source, r);
reSource = dfrnt(output, ir);
output4 = dfrnt(output, r);
output4 = dfrnt(output4, r);
output4 = dfrnt(output4, r);