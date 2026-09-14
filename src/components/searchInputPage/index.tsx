import { FC, forwardRef, useState } from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from 'src/assets/icons/SearchIcon';
import * as S from './@types';
import { ISearchInputPageProps } from './types';

const SearchInputPage: FC<ISearchInputPageProps> = forwardRef(({ onChange, ...props }, ref) => {
    const [value, setValue] = useState<string>('');

    return (
        <S.SearchInputPageWrapper
            onKeyUp={() => {
                onChange(value);
            }}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            placeholder="Search..."
            id="standard"
            variant="outlined"
            inputRef={ref}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                style: {
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#F2F3F7',
                    fontFamily: 'Poppins',
                    fontSize: 14,
                    color: '#7A7A7A',
                    height: '48px',
                    border: 'none'
                }
            }}
            {...props}
        />
    );
});

export default SearchInputPage;
