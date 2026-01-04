import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, X, Loader2, ScanLine, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChartUploaderProps {
  onAnalyze: (imageBase64: string, ticker?: string) => void;
  isLoading: boolean;
  scansRemaining?: number;
  scansLimit?: number;
  isPremium?: boolean;
}

export function ChartUploader({ 
  onAnalyze, 
  isLoading, 
  scansRemaining = 5, 
  scansLimit = 5,
  isPremium = false 
}: ChartUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [ticker, setTicker] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleFile = useCallback((file: File) => {
    setFileError(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a PNG or JPG image');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('Image must be less than 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
    setImageBase64(null);
    setTicker('');
    setFileError(null);
  };

  const handleAnalyze = () => {
    if (imageBase64) onAnalyze(imageBase64, ticker || undefined);
  };

  const canScan = isPremium || scansRemaining > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="icon-circle-sm bg-secondary">
            <ScanLine className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-black text-lg">Upload Chart</h3>
        </div>
        {!isPremium ? (
          <Badge variant={scansRemaining > 2 ? "secondary" : scansRemaining > 0 ? "outline" : "destructive"} className="font-bold">
            {scansRemaining}/{scansLimit} scans
          </Badge>
        ) : (
          <Badge className="bg-gradient-to-r from-warning to-orange-500 text-black border-0 font-bold">
            <Sparkles className="h-3 w-3 mr-1" />
            Unlimited
          </Badge>
        )}
      </div>

      <div className="p-5 space-y-4">
        {preview ? (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-border bg-muted/30">
              <img src={preview} alt="Chart preview" className="w-full h-auto max-h-[350px] object-contain" />
              {!isLoading && (
                <Button variant="secondary" size="icon" className="absolute top-3 right-3 h-8 w-8 rounded-full" onClick={clearPreview}>
                  <X className="h-4 w-4" />
                </Button>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center space-y-3"
                  >
                    <div className="relative">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-secondary" />
                      <div className="absolute inset-0 h-12 w-12 mx-auto rounded-full bg-secondary/20 animate-ping" />
                    </div>
                    <div>
                      <p className="font-black">Analyzing chart...</p>
                      <p className="text-sm text-muted-foreground">AI is processing patterns</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Ticker Input */}
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-bold">Stock Ticker (optional)</Label>
              <Input
                id="ticker"
                placeholder="e.g., AAPL, TSLA, NVDA"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                disabled={isLoading}
                className="font-mono uppercase rounded-xl border-2"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">Adding ticker enables live price data</p>
            </div>

            {/* Analyze Button */}
            <motion.button
              whileHover={{ scale: canScan && !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: canScan && !isLoading ? 0.98 : 1 }}
              onClick={handleAnalyze}
              disabled={isLoading || !canScan}
              className={cn(
                "w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all",
                canScan && !isLoading ? "btn-secondary" : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : !canScan ? (
                'No scans remaining'
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Analyze with AI
                </>
              )}
            </motion.button>
          </div>
        ) : (
          /* Upload Zone - Duolingo Style */
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={cn(
              "border-2 border-dashed rounded-3xl transition-all duration-200 bg-gradient-blue",
              isDragging && "border-secondary bg-secondary/10 scale-[1.02]",
              fileError && "border-destructive"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <label className="flex flex-col items-center cursor-pointer py-12 px-6">
              <motion.div 
                animate={{ y: isDragging ? -10 : 0 }}
                className={cn(
                  "h-20 w-20 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all",
                  isDragging ? "bg-secondary" : "bg-secondary/80"
                )}
              >
                {isDragging ? (
                  <Image className="h-10 w-10 text-white" />
                ) : (
                  <Upload className="h-10 w-10 text-white" />
                )}
              </motion.div>
              <h3 className="text-xl font-black mb-2 text-center">
                {isDragging ? 'Drop it here!' : 'Upload a Chart'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Drag & drop or click to select
              </p>
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-secondary mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Powered by AI</span>
              </div>
              <Button variant="secondary" type="button" className="rounded-xl font-bold">
                Choose Image
              </Button>
              <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleChange} />
            </label>
          </motion.div>
        )}

        {fileError && (
          <p className="text-sm text-destructive text-center font-semibold">{fileError}</p>
        )}
      </div>
    </motion.div>
  );
}
