(Get-ChildItem -Name | Where-Object { -not ($_.StartsWith(".")) }).Count
