# 间隔值测试文档

## 测试间隔值为20的效果

这是一个用来测试间隔值为20时高亮效果的文档。我们需要确保每隔20个词就会有一个词被高亮显示。这个文档包含足够多的文字来测试大间隔值的效果。

在这个段落中，我们将测试中文文本的处理效果。每个汉字都被视为一个词，所以当间隔值设置为20时，应该每隔20个汉字就会有一个汉字被高亮。这样可以帮助我们验证修复后的算法是否正确工作。

## 测试间隔值为200的效果

现在我们来测试一个更大的间隔值。当间隔值设置为200时，需要有足够长的文本才能看到高亮效果。这个测试将验证我们修复的算法能否正确处理大间隔值的情况。

这里是一段很长的文本，用来测试大间隔值的效果。我们需要确保即使间隔值很大，比如200，算法也能正确工作。之前的问题是当间隔值很大时，可能永远不会达到高亮位置，导致没有任何文字被高亮。现在我们使用模运算来解决这个问题，确保每隔指定数量的词就会有一个词被高亮，无论间隔值有多大。

这段文本应该足够长，包含超过200个词，这样我们就能看到至少一个词被高亮。如果算法工作正常，我们应该能看到第200个词被高亮显示。这将证明我们的修复是成功的。

## English Text Test

This is an English paragraph to test the interval highlighting with English text. When the interval is set to 20, every 20th word should be highlighted. This helps us verify that the algorithm works correctly for both Chinese and English text.

For testing larger intervals like 200, we need a much longer text. This paragraph contains enough words to test the large interval functionality. The previous issue was that when the interval was very large, the highlighting position might never be reached, resulting in no highlighted words. Now we use modulo arithmetic to solve this problem, ensuring that every specified number of words will have one word highlighted, regardless of how large the interval value is.

This text should be long enough to contain more than 200 words, so we can see at least one word highlighted. If the algorithm works correctly, we should see the 200th word highlighted. This will prove that our fix is successful and the highlighting works properly with large interval values. 